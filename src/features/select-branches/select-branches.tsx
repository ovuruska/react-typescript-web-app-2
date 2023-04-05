import React from 'react'
import useAllBranches from "@hooks/useAllBranches";
import {BranchEntity} from "@domain/types/common/branch";
import DropdownBtnBottomDrawer from "@features/select-branches/dropdown-btn-bottom-drawer";

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

  return <DropdownBtnBottomDrawer onSelect={ handleSelect} label={label} options={allBranches} />

}

export default SelectBranches
