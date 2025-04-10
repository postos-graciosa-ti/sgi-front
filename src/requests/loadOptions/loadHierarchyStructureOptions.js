import api from "../../services/api"

const loadHierarchyStructureOptions = (setHierarchyStructureOptions) => {
  return (
    api
      .get(`/hierarchy-structure`)
      .then((response) => {
        let options = response?.data?.map((hierarchyStructure) => ({ value: hierarchyStructure.id, label: hierarchyStructure.name }))

        setHierarchyStructureOptions(options)
      })
  )
}

export default loadHierarchyStructureOptions