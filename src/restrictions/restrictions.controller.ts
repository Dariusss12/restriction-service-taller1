import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { RestrictionsService } from './restrictions.service';
import { CreateRestrictionDto } from './dto/create-restriction.dto';

@Controller('restrictions')
export class RestrictionsController {
  constructor(private readonly restrictionsService: RestrictionsService) {}

  @Post()
  create(@Body() createRestrictionDto: CreateRestrictionDto) {
    return this.restrictionsService.addRestriction(createRestrictionDto);
  }

  @Get()
  findAll() {
    return this.restrictionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restrictionsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.restrictionsService.remove(id);
  }
}
