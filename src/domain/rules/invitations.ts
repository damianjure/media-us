export function canSendInvitation(
  personId: string,
  teamMemberIds: string[],
): boolean {
  return personId !== "" && teamMemberIds.includes(personId);
}