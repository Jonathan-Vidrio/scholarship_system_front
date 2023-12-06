import { Box, Container, Typography } from "@mui/material"

const NotFoudPage = () => {
    return (
        <>
            <Container component={"main"} maxWidth={"md"}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                }}>
                    <Typography variant={"h1"} sx={{
                        mt: 12,
                        mb: 2,
                    }}>
                        404
                    </Typography>
                    <Typography variant={"h4"} sx={{ mb: 12 }}>
                        Not Found
                    </Typography>
                </Box>
            </Container>
        </>
    );
}

export default NotFoudPage;