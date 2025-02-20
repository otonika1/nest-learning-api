import { PartialType } from "@nestjs/mapped-types";
import { CreatePropertyFeatureDto } from "./createPropertyFeature.dto";

export class UpdatePropertyFeatureDto extends PartialType(CreatePropertyFeatureDto) {}