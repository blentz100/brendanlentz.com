import { Table } from "@mantine/core";
import type { ReactNode } from "react";

export default function MdxTable({ children }: { children: ReactNode }) {
  return (
    <Table withTableBorder withColumnBorders withRowBorders>
      {children}
    </Table>
  );
}

export const MdxThead = ({ children }: { children: ReactNode }) => <Table.Thead>{children}</Table.Thead>;
export const MdxTbody = ({ children }: { children: ReactNode }) => <Table.Tbody>{children}</Table.Tbody>;
export const MdxTr = ({ children }: { children: ReactNode }) => <Table.Tr>{children}</Table.Tr>;
export const MdxTh = ({ children }: { children: ReactNode }) => <Table.Th>{children}</Table.Th>;
export const MdxTd = ({ children }: { children: ReactNode }) => <Table.Td>{children}</Table.Td>;
