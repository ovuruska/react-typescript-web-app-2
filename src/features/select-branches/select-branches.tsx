import React from 'react'
import useAllBranches from "@hooks/useAllBranches";
import {BranchEntity} from "@domain/types/common/branch";
import DropdownBottomDrawer,{DropdownBottomDrawerItem} from "@components/buttons/dropdown-bottom-drawer/dropdown-bottom-drawer";

interface SelectBranchProps {
  onSelect?: (branch: BranchEntity[]) => void;
}


const SelectBranches: React.FC<SelectBranchProps> = ({
                                                      onSelect
                                                   }) => {

  const [selectedBranches, setSelectedBranches] = React.useState<BranchEntity[]>([]);
  const allBranches: BranchEntity[] = useAllBranches();

  const handleSelect = (branches: BranchEntity[]) => {
    setSelectedBranches(branches);
    onSelect && onSelect(branches);
  }

  let label = "Select Store";
  if(selectedBranches.length  == 1) {
    label = selectedBranches[0].name;
  }else if(selectedBranches.length > 1){
    label = `${selectedBranches.length} Stores Selected`;
  }

  const options = allBranches.map((branch) => {
    return {
      id: branch.id,
      title: branch.name,
      description: branch.address,
      value:branch
    } as DropdownBottomDrawerItem<BranchEntity>
  });

  return <DropdownBottomDrawer onSelect={handleSelect} label={label} options={options}/>

}

export default SelectBranches
