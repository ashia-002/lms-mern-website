//import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useContext, useState } from "react";
import CommonForm from "@/components/config/form";
import { AuthContext } from "@/components/context/AuthContext";
import { signInFormControls, signUpFormControls } from "@/components/config/signUpFormControls";
import Navbar from "@/components/students/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AuthPage() {

    const [activeTab, setActiveTab] = useState('signin');
    
    const {
        signInFormData, setSignInFormData,
        signUpFormData, setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        handleLogout,
        isAuthenticated
    } = useContext(AuthContext);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);
    

    function handleTabChange(value) {
        setActiveTab(value);
    }

    function checkIfSignInFormIsValid(){
        return signInFormData && signInFormData.userEmail !== '' && signInFormData.password !== ''
    }

    function checkIfSignUpFormIsValid(){
        return signUpFormData && signUpFormData.userEmail !== '' && signUpFormData.password !== ''
    }

    console.log(signInFormData)
    console.log(signUpFormData)
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Tabs value={activeTab}
                    defaultValue="signin"
                    onValueChange={handleTabChange}
                    className="w-full max-w-md"
                >
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="signin">
                        <Card className="p-6 space-y-4">
                            <CardHeader>
                                <CardTitle>
                                    Sign in to your account.
                                </CardTitle>
                                <CardDescription>
                                    Enter your email and password to access your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <CommonForm formControls={signInFormControls} 
                                            buttonText={'Sign in'} 
                                            formData={signInFormData}
                                            setFormData={setSignInFormData}
                                            isButtonDisabled={!checkIfSignInFormIsValid()}
                                            handleSubmit={handleLoginUser}/>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="signup">
                    <Card className="p-6 space-y-4">
                            <CardHeader>
                                <CardTitle>
                                    Create a new account
                                </CardTitle>
                                <CardDescription>
                                    Enter your details to get started
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                            <CommonForm formControls={signUpFormControls} 
                                        buttonText={'Sign Up'}
                                        formData={signUpFormData}
                                        setFormData={setSignUpFormData}
                                        isButtonDisabled={!checkIfSignUpFormIsValid()}
                                        handleSubmit={handleRegisterUser}/>
                            </CardContent>
                        </Card>
                        
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default AuthPage;