import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './Generate.css';
import loadingGif from './Loading progress.gif'

const Generate = () => {
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleGoBack = () => {
      navigate(-1);
    };

    const validationSchema = Yup.object({
        prompt: Yup.string()
            .min(10, "Input must be at least 10 characters long")
            .required("Input is required"),
    });

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true);
        const form = new FormData();
        form.append('prompt', values.prompt);

        try {
            const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
                method: 'POST',
                headers: {
                    'x-api-key': '7efabb1e35d293a2e5fefae425d66e5155e8deced585349deeff20b2297c8429760eb4fea1151544fcfcd9ffe006fdc3', 
                },
                body: form,
            });

            if (!response.ok) {
                throw new Error('Failed to generate image');
            }

            const buffer = await response.arrayBuffer();
            const blob = new Blob([buffer]);
            const imageUrl = URL.createObjectURL(blob);

            setImageSrc(imageUrl);
            resetForm(); 
        } catch (error) {
            console.error('Error:', error);
            alert('Error generating image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <div className='Generate-Body-1'>
            <div className='Generate-Body-2'>
                <button onClick={handleGoBack} className="Back-button">&larr;</button>

                <Formik
                    initialValues={{ prompt: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="Generate-form">
                            <div>
                                <Field 
                                    name="prompt" 
                                    placeholder="Describe what you want to see" 
                                    className="Generate-input"
                                />
                                <ErrorMessage name="prompt" component="div" className="error-message" />
                            </div>
                            <button type="submit" className="Generate-submit-button">
                                {loading ? "Generating..." : "Generate Image"}
                            </button>
                        </Form>
                    )}
                </Formik>
                {loading && (
                    <div className="loading-container"><img src={loadingGif} className="Generate-loading"></img></div>
                )}

                {imageSrc && !loading && (
                    <div className="Generated-Image-Container">
                        <img src={imageSrc} alt="Generated" className="Generated-Image" />
                        <a href={imageSrc} download="generated-image.png" className="Download-button">
                        Download Image   &#x2B07;
                        </a>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}

export default Generate;
