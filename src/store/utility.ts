export const updateObject = <ObjectToUpdateType, ObjectToSpreadType>(oldObject: ObjectToUpdateType , updatedProperties: ObjectToSpreadType): ObjectToUpdateType => ({
  ...oldObject,
  ...updatedProperties
});
