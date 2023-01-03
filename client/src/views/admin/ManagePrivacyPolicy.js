import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ActionButtons from './ActionButtons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Title from './Title';
import axios from 'axios';
import { getData } from '../../lib/api';

const PrivacyPolicy = () => {
  const [ruleTitle, setRuleTitle] = useState('');
  const [ruleDescription, setRuleDescription] = useState('');
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState(true);

  const handleCancel = () => {
    setRuleTitle('');
    setRuleDescription('');
    setNewRule(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!ruleDescription || !ruleTitle) return;

    try {
      const data = {
        title: ruleTitle,
        description: ruleDescription,
      };

      if (newRule)
        await axios.post('http://localhost:8000/api/update-policy', data, {
          withCredentials: true,
        });
      else
        await axios.post('http://localhost:8000/api/edit-policy', data, {
          withCredentials: true,
        });
    } catch (err) {
      console.log(err);
    }
    setRuleTitle('');
    setRuleDescription('');
    setNewRule(true);
    //GetData
    await getData('privacy-policy', handleRules);
  };

  const handleEdit = async (e) => {
    setNewRule(false);

    const id = e.currentTarget?.id;
    console.log(rules);
    const ruleToEdit = rules?.find((rule) => rule?.title === id);
    console.log(ruleToEdit);

    setRuleTitle(ruleToEdit?.title);
    setRuleDescription(ruleToEdit?.description);
  };

  const handleDelete = async (e) => {
    try {
      const id = e.currentTarget?.id;
      console.log(id);

      if (!id) return;
      const data = { id: id };

      const res = await axios.post(
        'http://localhost:8000/api/delete-policy',
        data,
      );

      if (res.status !== 200) return;
    } catch (err) {
      console.log(err);
    }
    setRuleTitle('');
    setRuleDescription('');
    setNewRule(true);
    // getData();
    await getData('privacy-policy', handleRules);
  };

  const handleRules = (data) => {
    setRules(data?.content);
  };

  useEffect(() => {
    getData('privacy-policy', handleRules);
  }, []);

  return (
    <Box
      component='main'
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}>
      <Toolbar />
      <Container maxWidth='lg' sx={{ my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper
              sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box>
                <Title>Add rule title</Title>
                <TextField
                  id='set-ruleTitle'
                  label='Write rule title'
                  disabled={!newRule}
                  variant='outlined'
                  value={ruleTitle}
                  onChange={(e) => setRuleTitle(e.target.value)}
                  fullWidth
                  sx={{ mt: 1 }}
                />
              </Box>
              <Box>
                <Title>Rule description</Title>
              </Box>
              <TextField
                id='set-ruleDescription'
                label='Write rule description'
                variant='outlined'
                value={ruleDescription}
                onChange={(e) => setRuleDescription(e.target.value)}
                fullWidth
                sx={{ mt: 1 }}
              />
              <ActionButtons
                secondTitle={newRule ? 'Add new rule' : 'Save edited rule'}
                handleCancel={handleCancel}
                handleUpdate={handleUpdate}
              />
            </Paper>
            <Grid item xs={12} mt={4}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Title>Privacy Policy rules</Title>
                <Table size='small'>
                  <TableHead>
                    <TableRow>
                      <TableCell>id</TableCell>
                      <TableCell>Rule Titles</TableCell>
                      <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rules?.map((rule, i) => (
                      <TableRow key={i}>
                        <TableCell>{i}</TableCell>
                        <TableCell>{rule?.title}</TableCell>
                        <TableCell align='center'>
                          <IconButton
                            id={rule.title}
                            aria-label='edit post'
                            component='label'
                            onClick={handleEdit}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            id={rule.title}
                            aria-label='delete post'
                            component='label'
                            onClick={handleDelete}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
