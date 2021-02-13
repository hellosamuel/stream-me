import { useEffect } from "react"
import { Container, Typography, Box } from "@material-ui/core"

import Posts from "components/Posts"
import { useStreamsQuery, Stream } from "lib/graphql/streams.graphql"

export default function Streams() {
  const { data, loading, refetch } = useStreamsQuery({ errorPolicy: "ignore" })

  // 데이터가 추가되거나 삭제되었을때 refetch를 통해서 갱신을 보여준다
  // 다만 이 경우에는, fetchPolicy를 설정해주는 것이 더 좋을 것 같다 (cache-and-network)
  useEffect(() => {
    refetch()
  }, [])

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4">Streams</Typography>
      </Box>
      {!loading && data?.streams && <Posts streams={data.streams as Stream[]} />}
    </Container>
  )
}
