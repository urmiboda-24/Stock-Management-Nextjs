export const checkCondition = (
  condition: boolean,
  truePart: unknown,
  falsePart: unknown
) => {
  return condition ? truePart : falsePart;
};
