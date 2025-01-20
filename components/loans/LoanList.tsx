"use client";

import { usePathname } from "next/navigation";
import React, { useCallback, useState } from "react";
import {
  DragDropContext,
  DraggableLocation,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import { ILoanType } from "@/database/loanType.model";
import { drag } from "@/lib/actions/loanTypes.actions";
import { cn, parse } from "@/lib/utils";

import Loan from "./Loan";

interface loanListProps {
  loanTypesProp: string;
}

const LoanList = ({ loanTypesProp }: loanListProps) => {
  const [isOpen, setIsOpen] = useState<string>("");
  const pathname = usePathname();

  const loanTypes = parse(loanTypesProp);

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

  const onDragEnd = useCallback(async (result: DropResult) => {
    console.log(result);
    if (!result.destination) return;

    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    if (result.type === "LOANTYPE") {
      await drag({
        payload: { destination, source },
        path: pathname,
      });
    }
  }, []);

  return (
    <DragDropContext
      onBeforeCapture={onBeforeCapture}
      onBeforeDragStart={onBeforeDragStart}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="loanTypeList" type="LOANTYPE">
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
            {loanTypes.map((loan: ILoanType, index: number) => (
              <Loan
                key={loan._id}
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
