import React from 'react'
import {useInjection} from "inversify-react"
import {GetAllBranchesUseCase} from "@domain/usecases/branch/get-all-branches";
import useAllBranches from "@hooks/useAllBranches";
import DropdownWithTemplate from "@components/book/dropdown/dropdown_template";
import {BranchEntity} from "@domain/types/common/branch";

interface SelectBranchProps {
  // onClick
  onSelect?: (branch: BranchEntity) => void;
  width?: string;
}


const SelectBranch: React.FC<SelectBranchProps> = ({
                                                     width, onSelect
                                                   }) => {

  const allBranches: BranchEntity[] = useAllBranches();

  return DropdownWithTemplate<BranchEntity>({
    dropdownList: allBranches,
    width: width || "100%",
    dropdownTitle: "Select store",
    displayItem: (item) => item.name,
    onItemSelected: onSelect
  });

}

export default SelectBranch
