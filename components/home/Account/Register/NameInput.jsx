import React from 'react';
import { Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import InputLabel from './InputLabel';

// integrate Chakra Components with framer motion
const MotionFlex = motion(Flex);

const NameInput = ({
    inputAnimateControls,
    htmlForContent,
    labelText,
    inputId,
    placeholderContent,
    inputValue,
    handleInput,
    msgComponent,
}) => {
    return (
        <MotionFlex
            initial={{ opacity: 0 }}
            animate={inputAnimateControls}
            flexDir="column"
            flex="1"
        >
            <FormControl isRequired>
                <InputLabel htmlForContent={htmlForContent}>
                    {labelText}
                </InputLabel>

                <Input
                    px="1.5rem"
                    py="1.4rem"
                    mt="0.25rem"
                    id={inputId}
                    type="text"
                    placeholder={placeholderContent}
                    _placeholder={{
                        fontStyle: 'italic',
                    }}
                    style={{
                        fontSize: '0.95rem',
                        color: '#2D3748',
                        border: 'none',
                        backgroundImage: '#f2f8ff',
                        boxShadow:
                            '6px 6px 12px #c5cad1, -6px -6px 12px #ffffff',
                    }}
                    value={inputValue}
                    onChange={handleInput}
                />
            </FormControl>
            {msgComponent}
        </MotionFlex>
    );
};

export default NameInput;
