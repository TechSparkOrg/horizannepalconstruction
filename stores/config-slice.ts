import type { VastuConfig, BuildingPermitConfig } from "./admin-types";
import { defaultVastuConfig } from "./vastu-defaults";
import { defaultPermitConfig } from "./permit-defaults";

export interface ConfigSlice {
  vastuConfig: VastuConfig;
  buildingPermitConfig: BuildingPermitConfig;
  updateVastuConfig: (patch: Partial<VastuConfig>) => void;
  updateBuildingPermitConfig: (patch: Partial<BuildingPermitConfig>) => void;
}

export const initialConfigState = {
  vastuConfig: defaultVastuConfig,
  buildingPermitConfig: defaultPermitConfig,
};

export const createConfigSlice = (set: any): ConfigSlice => ({
  ...initialConfigState,
  updateVastuConfig: (patch) => set((s: any) => ({ vastuConfig: { ...s.vastuConfig, ...patch } })),
  updateBuildingPermitConfig: (patch) => set((s: any) => ({ buildingPermitConfig: { ...s.buildingPermitConfig, ...patch } })),
});
