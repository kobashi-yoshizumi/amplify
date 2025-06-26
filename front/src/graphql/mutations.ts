export const createRecord = /* GraphQL */ `
  mutation CreateRecord($input: CreateRecordInput!) {
    createRecord(input: $input) {
      id
      title
      content
    }
  }
`;

export const deleteRecord = /* GraphQL */ `
  mutation DeleteRecord($input: DeleteRecordInput!) {
    deleteRecord(input: $input) {
      id
    }
  }
`;