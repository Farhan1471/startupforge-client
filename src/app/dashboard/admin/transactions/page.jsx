import React from "react";
import { Table } from "@heroui/react";
import { Check, Xmark, Circle } from "@gravity-ui/icons";
import { getPayments } from "@/lib/api/payment";

const TransactionsPage = async () => {
  const payments = await getPayments();

  // Helper to render Status badges/icons cleanly
  const renderStatus = (status) => {
    switch (status?.toLowerCase()) {
      case "complete":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400">
            <Check className="w-3.5 h-3.5" /> Complete
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-400">
            <Xmark className="w-3.5 h-3.5" /> Failed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400">
            <Circle className="w-3.5 h-3.5" /> {status || "Pending"}
          </span>
        );
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Transactions
        </h1>
        <p className="text-sm text-neutral-500">
          Showing {payments?.length || 0} total payments
        </p>
      </div>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Transactions collection" className="min-w-[800px]">
            <Table.Header>
              <Table.Column isRowHeader>Transaction ID</Table.Column>
              <Table.Column>Email</Table.Column>
              <Table.Column>Plan</Table.Column>
              <Table.Column>Amount</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Date</Table.Column>
            </Table.Header>
            <Table.Body>
              {payments && payments.length > 0 ? (
                payments.map((payment) => {
                  const id = payment._id?.$oid || payment.transactionId || Math.random().toString();
                  const txId = payment.transactionId || "N/A";
                  const dateStr = payment.createdAt?.$date || payment.createdAt;
                  const formattedDate = dateStr 
                    ? new Date(dateStr).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "N/A";

                  return (
                    <Table.Row key={id}>
                      <Table.Cell className="font-mono text-xs text-neutral-500 max-w-[200px] truncate">
                        {txId}
                      </Table.Cell>
                      <Table.Cell className="font-medium">{payment.email}</Table.Cell>
                      <Table.Cell className="capitalize">{payment.planId}</Table.Cell>
                      <Table.Cell className="font-semibold text-neutral-800 dark:text-neutral-200">
                        ${parseFloat(payment.amount || 0).toFixed(2)}
                      </Table.Cell>
                      <Table.Cell>{renderStatus(payment.status)}</Table.Cell>
                      <Table.Cell className="text-neutral-500 text-sm">
                        {formattedDate}
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={6} className="text-center py-8 text-neutral-400">
                    No transactions found.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default TransactionsPage;