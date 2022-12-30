import { PartialType } from '@nestjs/mapped-types';
import { CreatePlannerDto } from './create-planner.dto';

export class UpdatePlannerDto extends PartialType(CreatePlannerDto) {}
