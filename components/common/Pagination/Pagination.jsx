/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { usePagination, DOTS } from "../../../hooks/usePagination";
import {
  HStack,
  IconButton,
  useColorModeValue,
  Text,
  Button,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <>
      <HStack>
        <IconButton
          disabled={currentPage === 1}
          aria-label="Previous"
          icon={
            <ArrowBackIcon color={useColorModeValue("#031d46", "#fffdfe")} />
          }
          onClick={onPrevious}
        />

        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <Text>&#8230;</Text>;
          }

          return (
            <Button
              key={pageNumber}
              colorScheme={pageNumber === currentPage ? "teal" : "gray"}
              onClick={() => onPageChange(pageNumber)}
              color={useColorModeValue("#031d46", "#fffdfe")}
            >
              {pageNumber}
            </Button>
          );
        })}

        <IconButton
          disabled={currentPage === lastPage}
          aria-label="Next"
          icon={
            <ArrowForwardIcon color={useColorModeValue("#031d46", "#fffdfe")} />
          }
          onClick={onNext}
        />
      </HStack>
    </>
  );
};

export default Pagination;
