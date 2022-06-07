import React from "react"
import { Box, Text } from "@chakra-ui/react"
import {getToken} from "../../sevices/LocalStorageServices"

import { useGetLoggedUserQuery} from "../../sevices/userAuthApi";


const Logo = (props) => {

  const token = getToken();
  const {data} = useGetLoggedUserQuery(token);

    return (
        <Box {...props}>
          {data && <Text fontSize="lg" fontWeight="bold">
            Hi, {data.user.email}
          </Text>}
        </Box>
      )
}

export default Logo