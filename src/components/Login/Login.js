import React,{useState,useEffect} from 'react';
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,
    Paper,Box,Grid,Typography,Badge,Stack,Alert,Snackbar} from '@mui/material'
import {LockOutlined} from '@mui/icons-material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PebaImage from '../images/PebaImage.jpeg';
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router';
import { signIn } from '../../actions/auth';
import { getReqAttDepts,getReqAttDeptsNoLoading} from '../../actions/purchaseOrders';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.facebook.com/photo/?fbid=4352108184856470&set=a.119322791468385">
        GlensonPinakaGwapo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignInSide() {

  const {authData,isLoading} = useSelector(state => state.auth);
  const {isLoading:isPOLoading,reqAttDepts} = useSelector(state => state.purchaseOrders);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user,setUser] = useState({
    username:null,
    password:null
  });

  //snackbar
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const [notReqAttDepts,setNotReqAttDepts] = useState(null);

  const onChangeText = (name,e) =>{
    setUser({
      ...user,
      [name] : e.target.value
    })
  }

  const handleSubmit = () => {

    const regexPattern = /^[a-zA-Z0-9]{1,40}$/;

    if (!regexPattern.test(user.username) || !regexPattern.test(user.password)) {
      setSnackbar({ children: 'Please check your input', severity: 'error' });
      return;
    } 

    if(user.username && user.password)
      dispatch(signIn(user));
    else
     setSnackbar({ children: 'Please check your input', severity: 'error' });
  };

  useEffect(() => {
    if(!isLoading && authData?.message === 'signIn')
      navigate(`/purchase-order-detail/`);
    else if(!isLoading && authData?.message === 'error')
      setSnackbar({ children: 'Invalid Credentials, Please try again', severity: 'error' });
  }, [isLoading]);

  // -- ORIGINAL
  useEffect(()=>{
    dispatch(getReqAttDepts());
    console.log('called getReqAttDepts login')
  },[dispatch]);

  // CALL EVERY 60 SECONDS
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getReqAttDeptsNoLoading());
      console.log('called getReqAttDepts');
    }, 900000); // 15 minutes timeout
    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(()=>{
    if(!isPOLoading && reqAttDepts){
      setNotReqAttDepts(reqAttDepts);
    }
  },[isPOLoading,reqAttDepts])

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${PebaImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Stack 
                direction={{ xs: 'row', sm: 'row' }}
                spacing={{ xs: 8, sm: 8, md: 8 }} useFlexGap flexWrap="wrap">
                    
                <Badge color="error" badgeContent={notReqAttDepts?.AM} sx={{ "& .MuiBadge-badge": { fontSize: 40, height: 45, minWidth: 45, borderRadius:50 } }}>
                    <Link href="/am" variant="h3" >AM</Link>  
                </Badge>
                <Badge color="error" badgeContent={notReqAttDepts?.PD} sx={{ "& .MuiBadge-badge": { fontSize: 40, height: 45, minWidth: 45, borderRadius:50 } }}>
                  <Link href="/pd" variant="h3" >PD</Link>    
                </Badge>
                <Badge color="error" badgeContent={notReqAttDepts?.PU} sx={{ "& .MuiBadge-badge": { fontSize: 40, height: 45, minWidth: 45, borderRadius:50 } }}>
                  <Link href="/purchasing" variant="h3" >PURCH</Link>   
                </Badge>
                <Badge color="error" badgeContent={notReqAttDepts?.PROD} sx={{ "& .MuiBadge-badge": { fontSize: 40, height: 45, minWidth: 45, borderRadius:50 } }}>
                  <Link href="/production" variant="h3" >PROD</Link>   
                </Badge>
                <Badge color="error" badgeContent={notReqAttDepts?.QA} sx={{ "& .MuiBadge-badge": { fontSize: 40, height: 45, minWidth: 45, borderRadius:50 } }}>
                  <Link href="/qa" variant="h3" >QA</Link>    
                </Badge>
                <Badge color="error" badgeContent={notReqAttDepts?.LOGS} sx={{ "& .MuiBadge-badge": { fontSize: 40, height: 45, minWidth: 45, borderRadius:50 } }}>
                  <Link href="/logistics" variant="h3" >LOGS</Link>   
                </Badge>
            </Stack>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main',mt:5 }}>
              <LockOutlined />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            
            <Box component="div" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                onChange={(e)=>onChangeText('username',e)}
                onKeyDown={(e)=> e.keyCode === 13 && handleSubmit() }
                label="Username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                onChange={(e)=>onChangeText('password',e)}
                onKeyDown={(e)=> e.keyCode === 13 && handleSubmit() }
                type="password"
              />
            
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign In 
              </Button>
              
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        <div>
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={4000}
                > 
                    <Alert {...snackbar} onClose={handleCloseSnackbar} variant="filled" />
                </Snackbar>
            )}
        </div>
      </Grid>
    </ThemeProvider>
  );
}