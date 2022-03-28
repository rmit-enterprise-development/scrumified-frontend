import { Text } from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import { useRouter } from "next/router";

const Project = () => {
  const router = useRouter();
  const { pid } = router.query;

  return (
    <>
      <Text> Hello from project {pid} </Text>
      <Avvvatars value={pid} style="shape" />
    </>
  );
};
export default Project;
