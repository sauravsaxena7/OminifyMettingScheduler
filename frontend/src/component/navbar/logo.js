import React from "react"
import { Box, Text } from "@chakra-ui/react"
import {getToken} from "../../sevices/LocalStorageServices"



const Logo = (props) => {

  const token = getToken();
  

    return (
        <Box {...props}>
           <Text fontSize="lg" fontWeight="bold">
          OminifyMettingScheduler
          </Text>
        </Box>
      )
}

export default Logo