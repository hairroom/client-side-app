import React, { useState, useContext } from "react";
import {
  Avatar,
  Box,
  Button,
  capitalize,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { LayoutOrders } from "../components/layouts/LayoutOrders";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { validations } from "../utils";
import GetOut from '../components/ui/GetOut';
import { OrderContext } from '../context/orders/OrderContext';
import { Loading } from "../components/ui/Loading";
import SaveIcon from '@mui/icons-material/Save';
import MenuItem from '@mui/material/MenuItem';

type FormData = {
  name: string;
  numberIdentification: string;
  typeIdentification: string;
  lastName: string;
  phone: number;
  email: string;
  address: string;
//   service: string;
//   product: string;
//   price: number;
//   paymentMethod: string;
};

const NewOrder = () => {

    const typeDocuments = [
        "Cédula de Ciudadanía",
        "Tarjeta de Identidad",
        "Pasaporte",
        "Cédula de Extranjería",
    ];

    const [typeDoc, setTypeDoc] = useState('');
    const [touched, setTouched] = useState(false);
    let navigate = useNavigate();

    const onTypeDocumentChanged = (event: any) => {
        console.log(event.target.value);
        setTypeDoc(event.target.value);
        setTouched(true);
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        mode: "onChange",
        reValidateMode: "onChange",
        });

    const { addOrder } = useContext(OrderContext);
    const [loading, setLoading] = useState(false);

    const onSaveData = async ({
        name,
        lastName,
        phone,
        email,
        numberIdentification,
        typeIdentification,
        address,
        }: FormData) => {
    
        setLoading(true);
    
        console.log('type identification', typeDoc)

        const isValidData = await addOrder(name,
            lastName,
            phone,
            email,
            numberIdentification,
            typeDoc,
            address);
        
        if (isValidData["_id"]) {
            navigate('/');
            
        }
        setLoading(false)
            
      }

    return (
        <div>
            {
                loading 
                    ? ( <Loading /> )
                    : (
                        <>
                            <GetOut />
                                <LayoutOrders>
                                    <form onSubmit={handleSubmit(onSaveData)} noValidate>
                                        <Box sx={{ width: 350, margin: "0 auto" }}>
                                            <Typography
                                                variant="h2"
                                                fontWeight={600}
                                                fontSize="30px"
                                                textAlign="center"
                                                marginBottom={6}
                                            >
                                                Registro de órdenes
                                            </Typography>
                                            <Grid item xs={12}>
                                                <FormControl fullWidth sx={{ mb: 2 }} variant="filled">
                                                    <InputLabel id="demo-simple-select-label">Tipo de Documento</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={typeDoc}
                                                        label="Age"
                                                        onChange={onTypeDocumentChanged}
                                                    >
                                                        {
                                                            typeDocuments.map(typeDocument => (
                                                                <MenuItem
                                                                    key={typeDocument}
                                                                    value={typeDocument}
                                                                >
                                                                    {typeDocument}
                                                                </MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Número de Identificación"
                                                        autoComplete="off"
                                                        type="string"
                                                        variant="filled"
                                                        fullWidth
                                                        defaultValue={localStorage.getItem("numberIdentification")}
                                                        {...register("numberIdentification", {
                                                            required: "Este campo es requerido",
                                                            minLength: {
                                                                value: 4,
                                                                message: "Debe de tener un mínimo de 4 caracteres.",
                                                            },
                                                            maxLength: {
                                                            value: 15,
                                                            message: 'Superaste el límite de caracteres, debe tener máximo 15.'
                                                            }
                                                        })}
                                                        error={!!errors.numberIdentification}
                                                        helperText={errors.numberIdentification?.message}
                                                    />
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Nombre"
                                                        autoComplete="off"
                                                        type="text"
                                                        variant="filled"
                                                        fullWidth
                                                        defaultValue={localStorage.getItem("name")}
                                                        {...register("name", {
                                                            required: "Este campo es requerido",
                                                            minLength: {
                                                            value: 3,
                                                            message: "Debe de tener un mínimo de 3 caracteres.",
                                                            },
                                                            maxLength: {
                                                            value: 25,
                                                            message: 'Superaste el límite de caracteres, debe tener máximo 25.'
                                                            }
                                                        })}
                                                        error={!!errors.name}
                                                        helperText={errors.name?.message}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Apellidos"
                                                        autoComplete="off"
                                                        type="text"
                                                        variant="filled"
                                                        fullWidth
                                                        defaultValue={localStorage.getItem("lastName")}
                                                        {...register("lastName", {
                                                            required: "Este campo es requerido",
                                                            minLength: {
                                                            value: 3,
                                                            message: "Debe de tener un mínimo de 3 caracteres.",
                                                            },
                                                            maxLength: {
                                                            value: 25,
                                                            message: 'Superaste el límite de caracteres, debe tener máximo 25.'
                                                            }
                                                        })}
                                                        error={!!errors.lastName}
                                                        helperText={errors.lastName?.message}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Celular"
                                                        autoComplete="off"
                                                        type="number"
                                                        variant="filled"
                                                        fullWidth
                                                        defaultValue={localStorage.getItem("phone")}
                                                        {...register("phone", {
                                                            required: "Este campo es requerido",
                                                            validate: (value) => validations.isNumberPhone(value),
                                                            minLength: {
                                                                value: 10,
                                                                message: "Debe de tener un mínimo de 10 caracteres.",
                                                            },
                                                            maxLength: {
                                                            value: 15,
                                                            message: 'Superaste el límite de caracteres, debe tener máximo 15.'
                                                            }
                                                        })}
                                                        error={!!errors.phone}
                                                        helperText={errors.phone?.message}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Email"
                                                        autoComplete="off"
                                                        type="email"
                                                        variant="filled"
                                                        fullWidth
                                                        defaultValue={localStorage.getItem("email")}
                                                        {...register("email", {
                                                            //validate: (value) => validations.isEmail(value),
                                                        })}
                                                        error={!!errors.email}
                                                        helperText={errors.email?.message}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Dirección de residencia"
                                                        autoComplete="off"
                                                        type="text"
                                                        variant="filled"
                                                        fullWidth
                                                        defaultValue={localStorage.getItem("address")}
                                                        {...register("address", {
                                                            //validate: (value) => validations.isEmail(value),
                                                        })}
                                                        error={!!errors.address}
                                                        helperText={errors.address?.message}
                                                    />
                                                </Grid>
                                                {/* <Grid item xs={12}>
                                                    <FormControl>
                                                        <FormLabel>Tipo de Documento:</FormLabel>
                                                        <RadioGroup
                                                            row
                                                            value={typeDoc}
                                                            onChange={onTypeDocumentChanged}
                                                        >
                                                            {typeDocument.map((document) => (
                                                                <FormControlLabel
                                                                    key={document}
                                                                    value={document}
                                                                    control={<Radio />}
                                                                    label={capitalize(document)}
                                                                />
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Grid> */}
                                            </Grid>
                                            <Box 
                                                display="flex"
                                                justifyContent="space-between" marginTop={2.5}
                                            >
                                                <div></div>
                                                <Button
                                                    className="circular-btn"
                                                    size="large"
                                                    type="submit"
                                                    disabled={ !isValid || !touched }
                                                    sx={{ backgroundColor: 'secondary.main',
                                                            '&:hover': {
                                                                backgroundColor: 'info.main',
                                                            }, 
                                                        }}
                                                >
                                                    <SaveIcon />
                                                    Enviar
                                                </Button>
                                            </Box>
                                        </Box>
                                    </form>
                                </LayoutOrders>
                        </>
                    )
            }
        </div>
    );
};

export default NewOrder;