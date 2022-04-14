import React from 'react';
import { FormLabel } from '@chakra-ui/react';
import { motion } from 'framer-motion';
const MotionFormLabel = motion(FormLabel);

const InputLabel = ({
    htmlForContent,
    inputMarginTop,
    inputAnimateInit,
    inputAnimateControls,
    children,
}) => {
    return (
        <MotionFormLabel
            htmlFor={htmlForContent}
            color="#031e49"
            fontSize={{ base: '0.6rem', md: '0.75rem' }}
            style={{ letterSpacing: '3px' }}
            pl="1.5rem"
            
            mt={inputMarginTop}
            initial={inputAnimateInit}
            animate={inputAnimateControls}
        >
            {children}
        </MotionFormLabel>
    );
};

export default InputLabel;
