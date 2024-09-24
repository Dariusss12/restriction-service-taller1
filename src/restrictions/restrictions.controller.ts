import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RestrictionsService } from './restrictions.service';
import { CreateRestrictionDto } from './dto/create-restriction.dto';

@Controller('restrictions-service')
export class RestrictionsController {
  constructor(private readonly restrictionsService: RestrictionsService) {}

  @Post('students/:studentId/restrictions/add')
  create(
    @Param('studentId', ParseUUIDPipe) studentId: string,
    @Body() createRestrictionDto: CreateRestrictionDto
  ) {
    return this.restrictionsService.addRestriction(createRestrictionDto, studentId);
  }

  @Get('students/:studentId/restrictions')
  findAll(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.restrictionsService.findAllRestrictions(studentId);
  }

  @Get('students/:studentId/check-restrictions')
  check(@Param('studentId') studentId: string) {
    return this.restrictionsService.checkRestrictions(studentId);
  }

  @Delete('students/:studentId/restrictions/:id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('studentId', ParseUUIDPipe) studentId: string
  ) {
    console.log(studentId);
    return this.restrictionsService.remove(id);
  }
}
