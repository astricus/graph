import { Button, TextInput } from "flowbite-react";
import React from "react";
import { HiSearch, HiSortAscending, HiSortDescending } from "react-icons/hi";

export default function Concepts() {
  return (
    <div>
      <div className="flex mb-3">
        <b>Concepts</b>
        <Button className="ml-auto mr-2" size="sm" color="light">
          <HiSortAscending />
        </Button>
        <Button size="sm" color="light">
          <HiSortDescending />
        </Button>
      </div>
      <TextInput
        type="search"
        icon={HiSearch}
        placeholder="Quick search for concept"
        required={true}
      />
    </div>
  );
}
