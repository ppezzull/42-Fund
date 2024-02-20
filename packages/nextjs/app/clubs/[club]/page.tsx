"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Box, Button, Grid, Image, Meter, ResponsiveContext } from "grommet";
import type { NextPage } from "next";
import CampaignBox from "~~/components/CampaignBox";
import deployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { GetFileFromIpfs } from "~~/utils/IPFSdeploy";
import { ExtendedCampaign, Campaign } from "~~/types/campaignInterface";

const ClubPage: NextPage = () => {
  const pathParts = usePathname().split("/");
  const club = pathParts[pathParts.length - 1];

  const { data: filteredCampaigns } = useScaffoldContractRead({
    contractName: "Fundraising",
    functionName: "getAllCampaignsByClub",
    args: [club],
  });

  const [campaignsByClub, setCampaignsByClub] = useState<ExtendedCampaign[]>([]);

  useEffect(() => {
    const handleIPFS = async (filteredCampaigns: Campaign[]) => {
      console.log("ciao");
      const allCampaigns: ExtendedCampaign[] = [];
      for (const campaign of filteredCampaigns) {
        if (campaign.ipfs) {
          try {
            const ipfsData = await GetFileFromIpfs(campaign.ipfs);
            const extendedCampaign: ExtendedCampaign = {
              ...campaign,
              description: ipfsData.description,
              title: ipfsData.title,
            };
            allCampaigns.push(extendedCampaign);
          } catch (error) {
            console.error(`Error fetching data for campaign with IPFS hash ${campaign.ipfs}:`, error);
          }
        }
      }
      console.log("allcampaigns with title", allCampaigns);
      setCampaignsByClub(allCampaigns);
    };

    if (filteredCampaigns) {
      const campaignsArray: Campaign[] = filteredCampaigns as Campaign[];
      handleIPFS(campaignsArray);
    }
  }, [filteredCampaigns]);

  const size = React.useContext(ResponsiveContext);

  return (
    <Box>
      <Box width="full" height="auto" background="#a3e635" direction="row" align="start">
        <Box pad="medium">
          <Box>
            <Image src={`/42Hack/${club}.png`} fit="contain" width="30%" className="rounded-full" />
          </Box>
        </Box>
        <Box width={{ max: "50%" }} justify="center" gap="medium" pad="medium">
          {/*  */}
          <h1 className="text-xl text-black ">About {club}</h1>
          {club === "42book" && (
            <Box gap="small">
              <h1 className=" text-black leading-4">
                The club organizes events such as reading sessions, meetings with authors, visits to local bookstores,
                and book exchanges. A great place to explore new titles and connect with other reading lovers.{" "}
              </h1>
            </Box>
          )}
          {club === "42activities" && (
            <Box gap="small">
              <h1 className=" text-black  leading-4">
                The club offers students a variety of exciting experiences outside the classroom. We organize field
                trips, museum visits, sports activities, special events and happy hours to promote physical and mental
                well-being. Join us to create unforgettable memories.
              </h1>
            </Box>
          )}
          {club === "42spaghetti" && (
            <Box gap="small">
              <h1 className=" text-black  leading-4">
                The ideal place for aspiring game developers. In this club, students will have the opportunity to
                cultivate their skills and carry out creative projects. Come out to us to explore the world of the video
                game industry and turn your ideas into interactive experiences.
              </h1>
            </Box>
          )}
          {club === "42talk" && (
            <Box gap="small">
              <h1 className=" text-black  leading-4">
                Our club is an incubator of voices and stories, providing a welcoming environment to explore new topics
                and create engaging audio content. We organize recording sessions, live events, and workshops to inspire
                creativity and idea sharing through podcasting.
              </h1>
            </Box>
          )}
          {club === "42startup" && (
            <Box gap="small">
              <h1 className=" text-black  leading-4">
                Our club is an incubator of innovative ideas and a meeting place for aspiring entrepreneurs. We offer
                support, networking and resources to help startups grow and thrive in the entrepreneurial ecosystem.
              </h1>
            </Box>
          )}
          {club === "42cybersecurity" && (
            <Box gap="small">
              <h1 className=" text-black  leading-4">
                Our club is a meeting place for enthusiasts and professionals eager to learn more about knowledge and
                practices in the field of cybersecurity. We offer workshops, conferences and resources to address the
                challenges of data protection in the digital world. We also participate in national competitions in the
                field.
              </h1>
            </Box>
          )}
          {club === "42music" && (
            <Box gap="small">
              <h1 className=" text-black  leading-4">
                Our club is the perfect place to explore, create and share the magic of music. We offer jam sessions,
                live events, workshops, performance spaces and collaborations for enthusiasts and musicians of all
                levels.
              </h1>
            </Box>
          )}
          {club === "42pingpong" && (
            <Box gap="small">
              <h1 className=" text-black  leading-4">
                the club is a gathering place for lovers of this exciting sport. We offer game sessions, friendly
                tournaments and coaching to promote passion and skill in pin pong, creating a fun and inclusive
                environment for all levels of players.
              </h1>
            </Box>
          )}
          {club === "42ciak" && (
            <Box gap="small">
              <h1 className=" text-black  leading-4">
                Our club is the ideal haven for film enthusiasts, offering screenings, discussions and special events to
                explore the world of filmmaking. Join us to discover masterpieces, share opinions, and cultivate your
                passion for film.
              </h1>
            </Box>
          )}
          {club === "42freelance" && (
            <Box gap="small">
              <h1 className=" text-black  leading-4">
                Our club is a hub of resources and connections for independent professionals seeking opportunities and
                support. We hold networking events, share resources and offer consultations to help freelancers improve
                in their career path.
              </h1>
            </Box>
          )}
          {club === "42gaming" && (
            <Box gap="small">
              <h1 className=" text-black  leading-4">
                Our club is the perfect place for gaming enthusiasts, offering tornerà, social gaming sessions and
                special events to connect players. Join us for unforgettable gaming experiences and create lasting
                community connections.
              </h1>
            </Box>
          )}
          {club === "42BDE" && (
            <Box gap="small">
              <h1 className=" text-black  leading-4">
                Our club offers unique experiences through a wide range of indoor and outdoor events. With creative
                organization and dedication, we create unforgettable moments that unite people, inspire and celebrate
                the diversity of our community.
              </h1>
            </Box>
          )}
          {/*  */}
        </Box>
      </Box>

      <Grid columns={size === "large" ? ["1/2", "1/2"] : "large"}>
        {campaignsByClub && campaignsByClub.length > 0 ? (
          campaignsByClub.map((campaign: ExtendedCampaign, index: number) => (
            <CampaignBox key={index} index={index} campaign={campaign} />
          ))
        ) : (
          <Box pad="large" margin="large">
            <h1>No campaigns yet.</h1>
          </Box>
        )}
      </Grid>
    </Box>
  );
};

export default ClubPage;

interface ClubCardProps {
  campaign: ExtendedCampaign;
}
