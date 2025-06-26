export const createRecord = /* GraphQL */ `
  mutation CreateRecord($input: CreateRecordInput!) {
    createRecord(input: $input) {
      id
      title
      content
    }
  }
`;