"use client";

import { FC } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";

import type { RouterOutputs } from "@webmeric/api";
import { Locale } from "@webmeric/validators";

import { api } from "~/trpc/react";

interface CommandOption {
  type: number;
  name: string;
  description: string;
  options?: CommandOption[];
}

interface Command {
  name: string;
  description: string;
  type: number;
  isGroup: boolean;
}

export const CommandsList: FC<{ locale: Locale }> = ({ locale }) => {
  const [commands] = api.aymeric.commands.useSuspenseQuery({ locale });

  const map = (
    commands: CommandOption[],
    parentName: string = "",
  ): Command[] => {
    return commands.reduce((acc: Command[], command: CommandOption) => {
      if (command.type === 1) {
        const commandName = parentName
          ? `${parentName} ${command.name}`
          : command.name;

        acc.push({
          name: commandName,
          description: command.description,
          type: command.type,
          isGroup:
            command.options?.some((x) => [1, 2].includes(x.type)) ?? false,
        });

        if (command.options && command.options.length > 0) {
          const childCommands = map(command.options, commandName);
          acc = acc.concat(childCommands);
        }
      } else if (command.type === 2 && command.options) {
        const childCommands = map(command.options, parentName);
        acc = acc.concat(childCommands);
      }

      return acc;
    }, []);
  };

  const list = map(commands).filter((x) => !x.isGroup);

  return (
    <Stack>
      {list.map((command) => (
        <CommandCard key={command.name} command={command} />
      ))}
    </Stack>
  );
};

export const CommandCard: FC<{
  command: Command;
}> = ({ command }) => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Group>
        <Avatar
          src="https://cdn.discordapp.com/avatars/265562769397514242/66d2639b3671292a3da581a461048277.png?size=1024"
          alt="it's me"
        />
        <Stack gap={0}>
          <Text fw={500}>/{command.name}</Text>

          <Text size="sm" c="dimmed">
            {command.description}
          </Text>
        </Stack>
      </Group>
    </Card>
  );
};
