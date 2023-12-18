import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const VerifyEmail = () => {
    const { verifyEmail } = useContext(AuthContext);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    
    useEffect(() => {
        const verify = async () => {
        try {
            await verifyEmail(searchParams.get("oobCode"));
            setSuccess(true);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
        };
        verify();
    }, [searchParams, verifyEmail]);

    
    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }
    
    if (success) {
        return (
        <Alert severity="success">
            Email berhasil diverifikasi. Silahkan login kembali.
        </Alert>
        );
    }
    
    return navigate("/");
    };

export default VerifyEmail;







