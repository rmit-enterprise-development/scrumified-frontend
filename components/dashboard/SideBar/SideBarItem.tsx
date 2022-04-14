import React from 'react';
import { Flex,Icon,useColorModeValue,Link,FlexProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { ReactText } from 'react';

interface ItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
    href: string;
}

export const SideBarItem = ({ icon, children, href, ...rest }: ItemProps) => {
    return (
        <Link href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                color={useColorModeValue('#031d46', '#fffdfe')}
                cursor="pointer"
                _hover={{
                    bg: useColorModeValue('#031d46', '#ee0405'),
                    color: useColorModeValue('#fffdfe', '#fffdfe'),
                }}
                {...rest}>
                {icon && (
                <Icon
                    mr="4"
                    fontSize="lg"
                    color={useColorModeValue('#031d46', '#fffdfe')}
                    _groupHover={{
                    color: useColorModeValue('#fffdfe', '#fffdfe'),
                    }}
                    as={icon}
                />
                )}
                {children}
            </Flex>
        </Link>
    );
};