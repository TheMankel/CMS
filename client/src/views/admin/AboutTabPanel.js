import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Title from '../../components/Title/Title';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import axios from 'axios';
import {
  createRef,
  uploadImage,
  downloadImage,
  deleteImage,
} from '../../lib/storage';
import { getData } from '../../lib/api';
import { verifyImage } from '../../lib/file-type';

const AboutTabPanel = (props) => {
  const { value, index, ...other } = props;
  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');
  const [team, setTeam] = useState([]);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [newMember, setNewMember] = useState(true);

  const handleUpload = async (e) => {
    try {
      const avatarFile = e.target.files[0];
      const status = await verifyImage(avatarFile);

      console.log(status);
      if (status !== 'Ok' || !avatarFile) return;

      setAvatar(avatarFile);
      e.target.value = '';
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelStory = () => {
    setPrimary('');
    setSecondary('');
  };

  const handleUpdateStory = async (e) => {
    e.preventDefault();

    if (!primary || !secondary) return;

    try {
      const data = {
        primary: primary,
        secondary: secondary,
      };

      await axios.post('http://localhost:8000/api/update-about-story', data, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
    setPrimary('');
    setSecondary('');
  };

  const handleCancelTeam = () => {
    setName('');
    setTitle('');
    setAbout('');
    setAvatar(null);
    setNewMember(true);
    setId('');
  };

  const handleUpdateTeam = async (e) => {
    e.preventDefault();

    if (!name || !title || !about || !avatar) return;

    try {
      const memberId =
        id || Date.now().toString() + Math.floor(Math.random() * 100);
      console.log(id);
      const userAvatarRef = createRef(`teamImages/${memberId}`);

      // const nameAvatar = name?.toLowerCase().replace(' ', '-');
      // const userAvatarRef = createRef(`teamImages/${nameAvatar}`);

      await uploadImage(userAvatarRef, avatar);
      const avatarUrl = await downloadImage(userAvatarRef);
      console.log(id);
      const data = {
        id: memberId,
        name: name,
        title: title,
        about: about,
        avatar: avatarUrl,
      };
      console.log(data);

      if (newMember)
        await axios.post('http://localhost:8000/api/update-about-team', data, {
          withCredentials: true,
        });
      else
        await axios.post('http://localhost:8000/api/edit-about-team', data, {
          withCredentials: true,
        });
    } catch (err) {
      console.log(err);
    }
    setName('');
    setTitle('');
    setAbout('');
    setAvatar(null);
    setNewMember(true);
    setId('');
    // Get Data
    await getData('about', handleTeamData);
  };

  const handleEditTeam = async (e) => {
    setNewMember(false);

    const memberId = e.currentTarget?.id;
    // console.log(memberId);

    const memberToEdit = team?.find((member) => member.id === memberId);
    // console.log(memberToEdit);
    const image = {
      name: memberToEdit.name.toLowerCase().replace(' ', '-'),
      avatar: memberToEdit.avatar,
    };

    setName(memberToEdit.name);
    setTitle(memberToEdit.title);
    setAvatar(image);
    setAbout(memberToEdit.about);
    setId(memberId);
  };

  const handleDeleteTeam = async (e) => {
    try {
      const memberId = e.currentTarget?.id;
      // console.log(memberId);

      if (!memberId) return;
      const data = { id: memberId };
      // console.log(data);

      const res = await axios.post(
        'http://localhost:8000/api/delete-about-team',
        data,
      );

      if (res.status !== 200) return;

      const teamImagesRef = createRef(`teamImages/${memberId}`);
      deleteImage(teamImagesRef);
    } catch (err) {
      console.log(err);
    }
    setName('');
    setTitle('');
    setAbout('');
    setAvatar(null);
    setNewMember(true);
    setId('');
    // getData();
    await getData('about', handleTeamData);
  };

  const handleTeamData = (data) => {
    // console.log(data);
    const { team } = data;
    setTeam(team);
  };

  useEffect(() => {
    getData('about', handleTeamData);
  }, []);

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`about-tabpanel-${index}`}
      aria-labelledby={`about-tab-${index}`}
      {...other}>
      {value === 0 && (
        <Grid
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}>
          <Box>
            <Title>Primary story</Title>
            <TextField
              id='set-primary'
              label='Write your main story'
              variant='outlined'
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
          </Box>
          <Box>
            <Title>Secondary story</Title>
            <TextField
              id='set-secondary'
              label='Write your secondary story'
              variant='outlined'
              value={secondary}
              onChange={(e) => setSecondary(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
          </Box>
          <ActionButtons
            handleCancel={handleCancelStory}
            handleUpdate={handleUpdateStory}
          />
        </Grid>
      )}
      {value === 1 && (
        <Grid item xs={12}>
          <Grid
            component='form'
            noValidate
            autoComplete='off'
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}>
            <Box>
              <Title>Name</Title>
              <TextField
                id='set-title'
                label='Write your name'
                variant='outlined'
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                sx={{ mt: 1 }}
              />
            </Box>
            <Box>
              <Title>Title</Title>
              <TextField
                id='set-description'
                label='Write your job title'
                variant='outlined'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                sx={{ mt: 1 }}
              />
            </Box>
            <Box display='flex' flexDirection='column' gap={1}>
              <Title>Avatar</Title>
              {avatar?.name && (
                <Box
                  component='img'
                  src={
                    avatar?.photo ? avatar?.photo : URL?.createObjectURL(avatar)
                  }
                  alt={avatar?.name}
                  sx={{
                    objectFit: 'cover',
                    width: '25%',
                    alignSelf: 'center',
                    borderRadius: 2,
                    mb: 1,
                  }}
                />
              )}
              <Button
                id='upload-background'
                variant='contained'
                component='label'
                onChange={handleUpload}
                sx={{
                  alignSelf: 'center',
                  textTransform: 'none',
                }}>
                Upload
                <input hidden accept='image/*' type='file' />
              </Button>
              <Box display='flex' gap={1}>
                <Typography>Currently uploaded photo:</Typography>
                <Typography color='GrayText'>
                  {avatar?.name ? avatar.name : 'none'}
                </Typography>
              </Box>
            </Box>
            <Title>About</Title>
            <TextField
              id='set-secondary'
              label='Write about yourself'
              variant='outlined'
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
            <ActionButtons
              secondTitle={newMember ? 'Add new member' : 'Save edited member'}
              handleCancel={handleCancelTeam}
              handleUpdate={handleUpdateTeam}
            />
          </Grid>
          <Grid sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Title>Team</Title>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {team?.map((member, i) => (
                  <TableRow key={i}>
                    <TableCell>{i}</TableCell>
                    <TableCell>{member?.name}</TableCell>
                    <TableCell align='center'>
                      <IconButton
                        id={member?.id}
                        aria-label='edit team member'
                        component='label'
                        onClick={handleEditTeam}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        id={member?.id}
                        aria-label='delete team member'
                        component='label'
                        onClick={handleDeleteTeam}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default AboutTabPanel;
