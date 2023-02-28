import { Button, Card, Heading, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import Wrapper from "../components/Wrapper";
import { config, GuitarInfo } from "../config/config";

export const Index: NextPage = () => {
  return (
    <Wrapper>
      <div className="flex justify-center    p-4">
        <div className="w-80">
          <Text>This is line 1</Text>
          <Text>Lorem ipsum dolor</Text>
          <Text>Hello World</Text>
          <VStack spacing={4}>
            {config.guitars.map((guitar: GuitarInfo, index: number) => (
              <Card variant="elevated" p="4" key={index}>
                <Heading as="h2">{guitar.name}</Heading>
                <Text>{guitar.desc}</Text>
                <Button colorScheme="teal">Buy this for ${guitar.price}</Button>
              </Card>
            ))}
          </VStack>
        </div>
      </div>
    </Wrapper>
  );
};

export default Index;
