import React from 'react';
import { Input } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionInput = motion(Input);

const OtherInput = ({
    inputId,
    inputValue,
    inputType,
    inputAnimateInit,
    inputAnimateControls,
    placeholderContent,
    handleInput,
}) => {
    return (
        <MotionInput
            px="1.5rem"
            py="1.4rem"
            mt="0.25rem"
            id={inputId}
            type={inputType}
            _hover={{ border: 'none' }}
            style={{
                fontSize: '0.95rem',
                color: '#2D3748',
                border: 'none',
                backgroundImage: '#f2f8ff',
                boxShadow: '6px 6px 12px #c5cad1, -6px -6px 12px #ffffff',
            }}
            initial={inputAnimateInit}
            animate={inputAnimateControls}
            placeholder={placeholderContent}
            _placeholder={{
                fontStyle: 'italic',
            }}
            value={inputValue}
            onChange={handleInput}
        />
    );
};

export default OtherInput;
