import React from "react";

const List = ({
  heading,
  listItems,
}: {
  heading: string;
  listItems: string[] | undefined;
}) => {
  return (
    <>
      <h2 className="mb-1 mt-5 text-[0.9rem] uppercase tracking-wide text-orange-950 dark:text-orange30">
        {heading}
      </h2>

      <ul className=" flex flex-col ">
        {listItems.map((item: string) => (
          <li className="border-t  border-orange10/10 py-1 " key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
};

export default List;
