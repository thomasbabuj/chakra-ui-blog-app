"use client";
import PageContent from "@/components/Layout/PageContent";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";

type pageProps = {};

const page: React.FC<pageProps> = () => {
  return (
    <>
      <PageContent>
        <>
          <Box p="14px 0px" borderBottom="1px solid" mb="2">
            <Heading as="h2" size="xl" mb={4}>
              About Us
            </Heading>
          </Box>
          <Flex
            direction={"column"}
            color={"white"}
            padding="6px 12px"
            justify={{ md: "space-between" }}
            p={5}
          >
            <Box>
              <Heading as="h3" size="lg" mb={4}>
                Unveil the Mystery:
              </Heading>
              <Text>
                At LikoBuzz! We believe that Pinoys engage in more than just
                idle chatter – it's an exploration of human nature and the world
                around us. Our corner is a safe space for you to delve into the
                latest scoops and cultural phenomena that ignite our curiosity
                and fuel our conversations.
              </Text>
            </Box>

            <Box mt="5">
              <Heading as="h4" size="lg" mb={4} noOfLines={[1, 2, 3]}>
                What Awaits You:
              </Heading>
            </Box>

            <Box mt="2" mb="2">
              <Text fontSize="lg" as="mark">
                🔮 Hot Gossip Updates:
              </Text>
              <Text>
                Stay ahead of the curve with up-to-the-minute gossip reports
                that keep you in the loop. From celebrity rumors to shocking
                revelations, we've got the pulse on what's making waves.
              </Text>
            </Box>

            <Divider size="sm" />
            <Box mt="2" mb="2">
              <Text as="mark">💬 Engaging Discussions:</Text>
              <Text>
                Dive into thought-provoking discussions about the stories that
                matter. Share your opinions, insights, and predictions with a
                community that loves dissecting every angle of the gossip world.
              </Text>
            </Box>

            <Divider size="sm" />
            <Box mt="2" mb="2">
              <Text as="mark">📸 Exclusive Insights:</Text>
              <Text>
                Get access to behind-the-scenes information that brings gossip
                to life, explore hidden connections, and uncover secrets you
                won't find anywhere else.
              </Text>
            </Box>

            <Divider size="sm" />
            <Box mt="2" mb="2">
              <Text as="mark">🎲 Gossip Ranking:</Text>
              <Text>
                Test your knowledge, predict outcomes, and challenge fellow
                members to see who's the ultimate gossip guru.
              </Text>
            </Box>

            <Divider size="sm" />
            <Box mt="2" mb="2">
              <Text as="mark">🌌 A Buzz of Perspectives:</Text>
              <Text>
                LikoBuzz is a diverse and inclusive space where different
                viewpoints come together. Gain new perspectives, broaden your
                horizons, and engage in conversations that enrich your
                understanding.
              </Text>
            </Box>

            <Box mt="5">
              <Heading as="h4" size="lg" mb={4}>
                Join the Community:
              </Heading>
            </Box>

            <Box mt="2" mb="2">
              <Text>
                We're not just a forum; we're aficionados who share a passion
                for all things captivating and thrilling. Your presence here
                makes our constellation shine even brighter. Whether you're a
                seasoned gossip explorer or just dipping your toes into the
                intrigue, you'll find a warm welcome among fellow enthusiasts.
              </Text>
            </Box>

            <Box mt="5">
              <Heading as="h4" size="lg" mb={4}>
                Embark on this Journey:
              </Heading>
            </Box>

            <Box mt="2" mb="2">
              <Text>
                Buckle up as we venture into the thrilling world of rumors,
                news, and conversations that will keep you hooked and engaged.
                Your journey with us is bound to be an unforgettable one!
              </Text>
            </Box>

            <Box>
              <Text>🌌 Let the buzz adventure begin! 🌌</Text>
            </Box>
          </Flex>
        </>
        <></>
      </PageContent>
    </>
  );
};
export default page;
