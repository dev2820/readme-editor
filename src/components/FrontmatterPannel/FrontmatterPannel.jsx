import { Button } from '@/components/ui/Button';
import { Calendar } from '@/components/ui/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { useMetadata } from '@/hooks/use-metadata';
import { date } from '@/utils';

import { Input } from '../ui/Input';

export function FrontmatterPannel() {
  const { title, setTitle, created, setCreated, modified, setModified } =
    useMetadata();

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeCreatedDate = (date) => {
    const newDate = new Date(date);

    newDate.setHours(created.getHours());
    newDate.setMinutes(created.getMinutes());
    newDate.setSeconds(created.getSeconds());

    setCreated(newDate);
  };
  const handleChangeCreatedTime = (e) => {
    const timeStr = e.target.value;
    const [hh, mm, ss] = timeStr.split(':').map(Number);

    const newDate = new Date(created);

    newDate.setHours(hh);
    newDate.setMinutes(mm);
    newDate.setSeconds(ss);

    setCreated(newDate);
  };

  const handleChangeModifiedDate = (date) => {
    const newDate = new Date(date);

    newDate.setHours(created.getHours());
    newDate.setMinutes(created.getMinutes());
    newDate.setSeconds(created.getSeconds());

    setModified(newDate);
  };
  const handleChangeModifiedTime = (e) => {
    const timeStr = e.target.value;
    const [hh, mm, ss] = timeStr.split(':').map(Number);

    const newDate = new Date(created);

    newDate.setHours(hh);
    newDate.setMinutes(mm);
    newDate.setSeconds(ss);

    setModified(newDate);
  };
  const handleClickSetNow = () => {
    setModified(new Date());
  };
  return (
    <>
      <div className="flex flex-row px-4">
        <span className="w-32">title</span>
        <Input
          value={title}
          onChange={handleChangeTitle}
          placeholder="Title"
          className="max-w-80"
        ></Input>
      </div>
      <div className="flex flex-row px-4">
        <span className="w-32">created</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost">
              {date.format(created, 'YYYY년 MM월 DD일 HH시 mm분 ss초')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={created}
              onSelect={handleChangeCreatedDate}
            ></Calendar>
            <label className="p-3 flex flex-row gap-2">
              시간
              <input
                type="time"
                value={date.format(created, 'hh:mm:ss')}
                step="1"
                onChange={handleChangeCreatedTime}
                className="color-grey flex-1"
              />
            </label>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-row px-4">
        <span className="w-32">modified</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost">
              {date.format(modified, 'YYYY년 MM월 DD일 HH시 mm분 ss초')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={modified}
              onSelect={handleChangeModifiedDate}
            ></Calendar>
            <label className="p-3 flex flex-row gap-2">
              시간
              <input
                type="time"
                value={date.format(modified, 'hh:mm')}
                step="1"
                onChange={handleChangeModifiedTime}
                className="color-grey flex-1"
              />
            </label>
          </PopoverContent>
        </Popover>
        <Button size="sm" variant="outline" onClick={handleClickSetNow}>
          Set Now
        </Button>
      </div>
    </>
  );
}
