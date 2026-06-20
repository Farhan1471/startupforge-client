import React from "react";
import { Chip, Table, Button } from "@heroui/react";
import { Eye, PencilToSquare, TrashBin } from "@gravity-ui/icons";
import { getStartupOpportunities } from "@/lib/api/opportunities";
import { getLoggedInFounderStartup } from "@/lib/api/startups";

const FounderStartupsPage = async () => {
  const startup = await getLoggedInFounderStartup();
  // console.log("Company ID:", startup?._id);
  const allOpportunities = await getStartupOpportunities(startup?._id);
  // console.log("Opportunities:", allOpportunities);


  const opportunities = (allOpportunities || []).filter(
    (opp) => opp.startupId && opp.startupId.toString() === startup?._id?.toString()
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Opportunities</h1>

      <Table>
        <Table.ResizableContainer>
          <Table.Content aria-label="Opportunities management table" className="min-w-[800px]">
            <Table.Header>
              <Table.Column isRowHeader defaultWidth="2fr" id="role" minWidth={180}>
                Role Title
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1.5fr" id="skills" minWidth={150}>
                Required Skills
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="type" minWidth={120}>
                Work Type / Level
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                Status
                <Table.ColumnResizer />
              </Table.Column>
              <Table.Column defaultWidth="1.2fr" id="actions" minWidth={140}>
                Actions
              </Table.Column>
            </Table.Header>
            
            <Table.Body>
              {opportunities && opportunities.map((opportunity) => (
                <Table.Row key={opportunity._id}>
                  {/* Role Title */}
                  <Table.Cell>
                    <span className="font-medium text-default-900">{opportunity.roleTitle}</span>
                  </Table.Cell>

                  {/* Required Skills */}
                  <Table.Cell>
                    <span className="text-default-600">{opportunity.requiredSkills}</span>
                  </Table.Cell>

                  {/* Work Type & Commitment Level */}
                  <Table.Cell>
                    <div className="flex flex-col gap-0.5">
                      <span className="capitalize text-sm text-default-800">{opportunity.workType}</span>
                      <span className="capitalize text-xs text-default-400">{opportunity.commitmentLevel}</span>
                    </div>
                  </Table.Cell>

                  {/* Status */}
                  <Table.Cell>
                    <Chip
                      color={opportunity.status === "active" ? "success" : "default"}
                      size="sm"
                      variant="soft"
                      className="capitalize"
                    >
                      {opportunity.status}
                    </Chip>
                  </Table.Cell>

                  {/* Actions (Video Details, Edit, Delete) */}
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        aria-label="Details"
                        title="Details"
                        className="text-primary"
                      >
                        <Eye width={16} height={16} />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        aria-label="Edit opportunity"
                        title="Edit opportunity"
                        className="text-default-500"
                      >
                        <PencilToSquare width={16} height={16} />
                      </Button>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        aria-label="Delete opportunity"
                        title="Delete opportunity"
                        className="text-danger"
                      >
                        <TrashBin width={16} height={16} />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ResizableContainer>
      </Table>
    </div>
  );
};

export default FounderStartupsPage;