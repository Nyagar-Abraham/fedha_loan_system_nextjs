"use client";

import React, { useCallback, useState } from "react";
import {
  DragDropContext,
  DraggableLocation,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import { useLoan } from "@/context/LoanContext";
import { cn } from "@/lib/utils";
import { loanTypeInterface } from "@/utils/Interfaces";

import Loan from "./Loan";

const LoanList = () => {
  const [isOpen, setIsOpen] = useState<string>("");
  const {
    LoanState: { loans },
    dispatch,
  } = useLoan();

  const onBeforeCapture = useCallback(() => {
    /* ... */
  }, []);
  const onBeforeDragStart = useCallback(() => {
    /* ... */
  }, []);
  const onDragStart = useCallback(() => {
    /* ... */
  }, []);
  const onDragUpdate = useCallback(() => {
    /* ... */
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      console.log(result);
      if (!result.destination) return;

      const source: DraggableLocation = result.source;
      const destination: DraggableLocation = result.destination;

      if (result.type === "LOAN") {
        dispatch({ type: "MOVE_LOAN", payload: { destination, source } });
      }

      console.log("tttt");
    },
    [dispatch]
  );

  console.log(loans);

  return (
    <DragDropContext
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="loanList" type="LOAN">
        {(Provided, snapshot) => (
          <ul
            ref={Provided.innerRef}
            {...Provided.droppableProps}
            className={cn(
              "grid p-3 rounded-sm gap-4 md:grid-cols-2 md:gap-y-6 lg:gap-6",
              {
                "bg-dark100-light10": snapshot.isDraggingOver,
              }
            )}
          >
            {loans.map((loan: loanTypeInterface, index) => (
              <Loan
                key={loan.value}
                loan={loan}
                index={index}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            ))}{" "}
            {Provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default LoanList;
