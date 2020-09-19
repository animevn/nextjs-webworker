import React, {useEffect, useRef, useState} from "react";
import * as ComLink from "comlink";
import {Box, Typography, Button} from "@material-ui/core";

export default function IndexContent() {

  const [value, setValue] = useState(0);
  const [block, setBlock] = useState(0);

  const comLinkWorkerRef = useRef();
  const comLinkWorkerApiRef = useRef();

  useEffect(()=>{
    comLinkWorkerRef.current = new Worker("../../utils/worker", {type: "module"});
    comLinkWorkerApiRef.current = ComLink.wrap(comLinkWorkerRef.current);

    return ()=>{
      comLinkWorkerRef.current.terminate();
    }
  }, []);

  const textStyle = {
    fontWeight:300,
    lineHeight:"1.8",
    textAlign:"justify",
    marginTop:"1rem"
  };

  const onIncreaseClick = ()=>{
    setValue(prev=>++prev)
  };

  const onResetClick = ()=>{
    setValue(0);
    setBlock(0)
  };

  const onBlockClick = async ()=>{
    const value = await ComLink.wrap(comLinkWorkerRef.current).getValue(block);
    setBlock(value);
  };

  return (
    <Box textAlign="justify" width={1} >

      <Typography variant="body2" style={textStyle}>
        Whyshop on construction
      </Typography>

      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={2}
        width={1}
      >

        <Box display="flex" flexDirection="row" justifyContent="space-around" width={0.3} >
          <Typography color="secondary" >{value}</Typography>
          <Typography color="error" >{block}</Typography>
        </Box>

        <Box display="flex"
             flexDirection="row"
             justifyContent="space-around"
             width={0.3}
             mt={3}
        >
          <Button onClick={onIncreaseClick}
                  variant="outlined"
          >
            Increase
          </Button>

          <Button onClick={onBlockClick}
                  variant="outlined"
          >
            Block
          </Button>

          <Button onClick={onResetClick}
                  variant="outlined"
          >
            Reset
          </Button>

        </Box>

      </Box>

    </Box>
  );

}

