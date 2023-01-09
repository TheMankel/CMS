import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import Title from '../../components/Title/Title';
import Info from '../../components/Info/Info';
import axios from 'axios';
import { getData } from '../../lib/api';

const PrivacyPolicy = () => {
  const [ruleTitle, setRuleTitle] = useState('');
  const [ruleDescription, setRuleDescription] = useState('');
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState(true);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleCancel = () => {
    setRuleTitle('');
    setRuleDescription('');
    setNewRule(true);
    setId(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!ruleDescription || !ruleTitle) return;

    try {
      const data = {
        id: id,
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
    setId(null);
    //GetData
    await getData('privacy-policy', handleRules);
  };

  const handleEdit = async (e) => {
    setNewRule(false);

    const ruleId = e.currentTarget?.id;
    console.log(ruleId);
    const ruleToEdit = rules?.find((rule) => rule?.id === ruleId);
    console.log(ruleToEdit);

    setRuleTitle(ruleToEdit?.title);
    setRuleDescription(ruleToEdit?.description);
    setId(ruleId);
  };

  const handleDelete = async (e) => {
    try {
      const ruleId = e.currentTarget?.id;
      setId(ruleId);
      console.log(ruleId);

      if (!ruleId) return;
      const data = { id: ruleId };

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
    setId(null);
    // getData();
    await getData('privacy-policy', handleRules);
  };

  const handleRules = (data) => {
    setRules(data?.content);
  };

  useEffect(() => {
    getData('privacy-policy', handleRules, setIsLoading);
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <Title>Add rule title</Title>
            <TextField
              id='set-ruleTitle'
              label='Write rule title'
              variant='outlined'
              value={ruleTitle}
              onChange={(e) => setRuleTitle(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
          </Box>
          <Box>
            <Title>Rule description</Title>
            <TextField
              id='set-ruleDescription'
              label='Write rule description'
              variant='outlined'
              value={ruleDescription}
              onChange={(e) => setRuleDescription(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
            />
          </Box>
          <ActionButtons
            secondTitle={newRule ? 'Add new rule' : 'Save edited rule'}
            handleCancel={handleCancel}
            handleUpdate={handleUpdate}
          />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Title>Privacy Policy rules</Title>
          {isLoading && (
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Rule title</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(4)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>{i}</TableCell>
                    <TableCell>{<Skeleton variant='text' />}</TableCell>
                    <TableCell>{<Skeleton variant='text' />}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {rules.length === 0 && !isLoading && (
            <Info message='No rules added!' />
          )}
          {rules.length > 0 && !isLoading && (
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell>Rule title</TableCell>
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
                        id={rule?.id}
                        aria-label='edit rule'
                        component='label'
                        onClick={handleEdit}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        id={rule?.id}
                        aria-label='delete rule'
                        component='label'
                        onClick={handleDelete}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PrivacyPolicy;
