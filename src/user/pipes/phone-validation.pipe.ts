
import {
    PipeTransform,
    Injectable,
    BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PhoneValidationPipe implements PipeTransform<string, string> {
    transform(value: string): string {
        if (!value) throw new BadRequestException('Phone is required');

        const cleaned = value.replace(/\D/g, '');
        if (!/^01[3-9]\d{8}$/.test(cleaned) || cleaned.length !== 11) {
            throw new BadRequestException('Invalid BD mobile number (01XXXXXXXXX)');
        }
        return cleaned;
    }
}