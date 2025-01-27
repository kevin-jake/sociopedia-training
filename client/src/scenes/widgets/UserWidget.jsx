import React, { useEffect, useState } from 'react'
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WidgetWrapper from 'components/WidgetWrapper';
import UserImage from 'components/UserImage';
import { Box, Divider, Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';

const UserWidget = ({ userId, picturePath}) => {
  const [user, setUser] = useState(null)
  const {palette} = useTheme();
  const navigate = useNavigate()
  const token = useSelector((state) => state.token)
  const dark = palette.neutral.dark
  const medium = palette.neutral.medium
  const main = palette.neutral.main
  
  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;


    return (
    <WidgetWrapper>
        <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
        >
            
            <FlexBetween gap="1rem">
                <UserImage image={picturePath} />
                <Box>
                    <Typography 
                    variant='h4'
                    color={dark}
                    fontWeight="500"
                    sx={{
                        "&:hover": {
                            color: palette.primary.light,
                            cursor: "pointer"
                        }
                    }}
                    >{firstName} {lastName}</Typography>
                    <Typography color={medium}>{friends.length} friends</Typography>
                </Box>
            </FlexBetween>
            <ManageAccountsOutlined />
            </FlexBetween>
            <Divider />
             
                    <Box p="1rem 0">
                        <Box display="flex" alignItems="center" mb="0.5rem">
                            <LocationOnOutlined fontSize='large' sx={{color: main}}/>
                    <Typography color={medium}>{location}</Typography>

                        </Box>
                        <Box p="0.5rem 0">
                        <Box display="flex" alignItems="center" gap="1rem">
                            <WorkOutlineOutlined fontSize='large' sx={{color: main}}/>
                    <Typography color={medium}>{occupation}</Typography>

                        </Box>
                    </Box>
</Box>
<Divider />
<Box p="1rem 0">
    <FlexBetween mb="0.5rem">
        <Typography color={medium}>Who's viewed your profile</Typography>
        <Typography color={main} fontWeight="500">{viewedProfile}</Typography>
    </FlexBetween>
    <FlexBetween mb="0.5rem">
        <Typography color={medium}>Impressions of your post</Typography>
        <Typography color={main} fontWeight="500">{impressions}</Typography>
    </FlexBetween>
</Box>
<Divider />

<Box p="1rem 0">
<Typography color={main} fontWeight="500" mb="1rem">Social Profiles</Typography>
<FlexBetween gap="1rem" mb="0.5rem">
<FlexBetween gap="1rem" ><img src="../assets/twitter.png"/></FlexBetween>
<Typography color={main} fontWeight="500">Twitter</Typography>
<Typography color={main}>Social Network</Typography>
<EditOutlined sx={{color: main}} />
</FlexBetween>

<FlexBetween gap="1rem" mb="0.5rem">
<FlexBetween gap="1rem" ><img src="../assets/linkedin.png"/></FlexBetween>
<Typography color={main} fontWeight="500">LinkedIn</Typography>
<Typography color={main}>Network Platform</Typography>
<EditOutlined sx={{color: main}} />
</FlexBetween>
</Box>


            

    </WidgetWrapper>
  )
}

export default UserWidget