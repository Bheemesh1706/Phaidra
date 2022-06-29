import styled from "styled-components";
import './App.css';
import { useState,useEffect } from "react";
import { getData } from "./backend/api";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  useToast
} from '@chakra-ui/react';

function App() {
   const [tableData,setTableData]=useState([]);
   const [limit,setLimit]= useState(100);
   const [page,setPage] = useState(1);
   const toast = useToast();

  useEffect(()=>{
      getData(limit).then((e)=>{
        const indexOfLastPost = page*100;
        const indexOFFirstPost = indexOfLastPost - 100;
        setTableData(e.slice(indexOFFirstPost,indexOfLastPost));
      });
  },[limit]);

  return (
   <Container>
        <TableContainer>
            <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>Match Id</Th>
                  <Th>Start Time</Th>
                  <Th>Duration</Th>
                  <Th>First Blood Time</Th>
                  <Th>Radiant Score</Th>
                  <Th>Dire Score</Th>
                </Tr>
              </Thead>
              <Tbody>
                { 
                tableData?.map((data,index)=>
                (<Tr key={index}>
                  <Td>{data.match_id}</Td>
                  <Td>{data.start_time}</Td>
                  <Td>{data.duration}</Td>
                  <Td>{data.first_blood_time}</Td>
                  <Td>{data.radiant_score}</Td>
                  <Td>{data.dire_score}</Td>
                </Tr>))
                }
              </Tbody>
            </Table>
      </TableContainer>
      <ButtonContainer>
      <Button onClick={()=>{
        setLimit(limit+100);
        setPage(page+1);
        toast({
          title: `Table updated by ${limit} rows`,
          status: "info",
          isClosable: true,
        })
      }}>Next</Button>
      <Button onClick={()=>{
        if(limit>100)
        {
          setLimit(limit-100);
          setPage(page-1);
        }
        else{
          toast({
            title: `This is the lest number of data can be shown per page`,
            status: "info",
            isClosable: true,
          })
        }
      }}>Previous</Button>
      </ButtonContainer>
      
   </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const ButtonContainer = styled.div`

  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`