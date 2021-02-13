import { useState, useEffect, FormEvent, MouseEvent } from "react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"

import { initializeApollo } from "lib/apollo"
import { useEditStreamMutation } from "lib/graphql/editStream.graphql"
import { useDeleteStreamMutation } from "lib/graphql/deleteStream.graphql"
import { StreamDocument } from "lib/graphql/stream.graphql"
import { Container, TextField, Typography, Box, Button } from "@material-ui/core"

export default function EditStream({ id }) {
  const router = useRouter()
  const [editStream] = useEditStreamMutation()
  const [deleteStream] = useDeleteStreamMutation()

  const [state, setState] = useState({
    _id: "",
    title: "",
    description: "",
    url: "",
  })

  const { _id, title, description, url } = state

  // 이 방식을 이용하면 렌더링이 2회밖에 일어나지 않는다.
  // 최초 1회, await 후 setState시 1회
  // 그러나, useStreamQuery + onCompleted를 이용할 시에 렌더링이 3회 일어난다
  // 아마도 useStreamQuery은 hook이기 때문에 자체적으로 state를 업데이트 하기 때문인듯 하다
  const fetchStream = async () => {
    const apollo = initializeApollo()
    const { data } = await apollo.query({
      query: StreamDocument,
      variables: { streamId: id },
    })
    setState(data.stream)
  }

  useEffect(() => {
    fetchStream()
  }, [])

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      const { data } = await editStream({
        variables: { input: { id: _id, title, description, url } },
      })
      if (data.editStream._id) {
        router.push("/streams")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onDelete = async (event: MouseEvent) => {
    event.preventDefault()

    try {
      const { data } = await deleteStream({
        variables: { id },
      })
      if (data.deleteStream) {
        router.push("/streams")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4">Edit Stream</Typography>
        <form onSubmit={onSubmit}>
          <Box pb={2.5} />
          <TextField
            autoFocus
            label="Title"
            value={title}
            onChange={e => setState({ ...state, title: e.target.value })}
            required
          />
          <Box pb={2.5} />
          <TextField
            label="Description"
            value={description}
            onChange={e => setState({ ...state, description: e.target.value })}
            required
          />
          <Box pb={2.5} />
          <TextField label="URL" value={url} onChange={e => setState({ ...state, url: e.target.value })} required />
          <Box pb={2.5} />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Box pb={2.5} />
          <Button onClick={onDelete} variant="contained">
            Delete
          </Button>
        </form>
      </Box>
    </Container>
  )
}

// EditStream.getInitialProps = ({ query: { id } }) => {
//   return { id }
// }

export const getServerSideProps: GetServerSideProps = async context => {
  const {
    query: { id },
  } = context
  return {
    props: {
      id,
    },
  }
}
