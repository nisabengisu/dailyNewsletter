"use client"

import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Header from '../../components/Header';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';

export default function ButtonAppBar() {
  const [rows, setRows] = useState([]);
  const [title, setTitle] = useState("");
  const [newsId, setNewsId] = useState(0);
  const [description, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  function getTokenFromCookie() {
    const allCookies = document.cookie;
    const cookieArray = allCookies.split('; ');
  
    for (const cookie of cookieArray) {
      const [name, value] = cookie.split('=');
  
      // İlgili cookie
      if (name === 'token') {
        return value; 
      }
    }
  
    return null; 
  }

  function get() { //Oluşturduğum Laravel kısmındaki verileri çekme işlemi 
    axios.get("http://localhost:3001/api/newsletter/get")
    .then(res => {
      setRows(res.data);
    })
    .catch(error => {
      console.error("Axios Error:", error);
    });
  }

  function create() { 
    const token = getTokenFromCookie();
    if(newsId != 0) { //Veritabaanına veri Güncelleme işlemi
      axios.post("http://localhost:3001/api/newsletter/update",
        {"id": newsId, "title": title, "description": description, "token": token, "status": 1}
      )
      .then(res => {
        get()
      })
      .catch(error => {
        console.error("Axios Error:", error);
      });
    }
    else {//Veritabaanına veri kaydetme işlemi
      axios.post("http://localhost:3001/api/newsletter/create",
        {"title": title, "description": description, "token": token, "status": 1}
      )
      .then(res => {
        get()
      })
      .catch(error => {
        console.error("Axios Error:", error);
      });
    }
    clear()
  }

  function deleteF() { //Veritabaanına veri silme işlemi
    axios.post("http://localhost:3001/api/newsletter/delete",
      {"id": newsId}
    )
    .then(res => {
      get()
      clear()
    })
    .catch(error => {
      console.error("Axios Error:", error);
    });
  }

  useEffect(() => {
    get()
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  };

  const clear = () => {
    setTitle("")
    setDesc("")
    setNewsId(0)
    setOpen(false)
    setDeleteOpen(false);
  }

  const handleClose = () => {
    setOpen(false)
  };
  
  const handleDeleteClickOpen = (row) => {
    setNewsId(row.id)
    setDeleteOpen(true)
  };

  const handleDeleteClose = () => {
    clear()
  };

  const handleUpdateClickOpen = (row) => {
    setNewsId(row.id)
    setTitle(row.title)
    setDesc(row.description)
    setOpen(true)
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>News Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Eklemek istediğiniz haber başlığını ve haberi yazınız.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="email"
            fullWidth
            variant="standard"
            value={title}
            onChange={evt=>{setTitle(evt.target.value)}}
          />
          <TextField
            autoFocus
            margin="dense"
            id="desc"
            label="Description"
            type="email"
            fullWidth
            variant="standard"
            value={description}
            onChange={evt=>{setDesc(evt.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Vazgeç</Button>
          <Button onClick={create}>Kaydet</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteOpen} onClose={handleClose}>
        <DialogTitle>Haber Silme</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bu haberi yayından kaldırmak istediğinize emin misiniz?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Hayır</Button>
          <Button onClick={deleteF}>Evet</Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ flexGrow: 1 }}>
          <Header></Header>
      </Box><br />

      <Container maxWidth="lg">
        <Button variant="outlined" onClick={handleClickOpen}>Yeni Haber Oluştur</Button>
        <br />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Setttings</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="right"><Delete onClick={()=>handleDeleteClickOpen(row)}/><Edit onClick={()=>handleUpdateClickOpen(row)}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}