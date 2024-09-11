export const useGetWeight = (
  metadata: any,
  weight: { value: number; unit: string }
) => {
  const unit = metadata.filter(
    (meta: { key: string }) => meta.key === "weight_unit"
  )[0]
    ? metadata.filter((meta: { key: string }) => meta.key === "weight_unit")[0]
        .value
    : "GM";

  const weightWithUnit =
    weight && `${weight.value}  ${unit.replace(/['"]+/g, "")}`;

  return weightWithUnit;
};
