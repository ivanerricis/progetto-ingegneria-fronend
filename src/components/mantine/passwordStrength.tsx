import { IconCheck, IconX } from '@tabler/icons-react';
import { Box, Center, Group, PasswordInput, Progress, Text } from '@mantine/core';
import { useInputState } from '@mantine/hooks';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
        <Text component="div" c={meets ? 'teal' : 'red'} mt={5} size="sm">
            <Center inline>
                {meets ? <IconCheck size={14} stroke={1.5} /> : <IconX size={14} stroke={1.5} />}
                <Box ml={7}>{label}</Box>
            </Center>
        </Text>
    );
}

const requirements = [
    { re: /[0-9]/, label: 'Include un numero' },
    { re: /[a-z]/, label: 'Include una lettera minuscola' },
    { re: /[A-Z]/, label: 'Include una lettera maiuscola' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Include un simbolo speciale' },
];

function getStrength(password: string) {
    let multiplier = password.length > 7 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export function PasswordStrength() {
    const [value, setValue] = useInputState('');
    const strength = getStrength(value);
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
    ));
    const bars = Array(4)
        .fill(0)
        .map((_, index) => (
            <Progress
                styles={{ section: { transitionDuration: '0ms' } }}
                value={
                    value.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
                }
                color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
                key={index}
                size={4}
                aria-label={`Password strength segment ${index + 1}`}
            />
        ));

    return (
        <div>
            <PasswordInput
                value={value}
                onChange={setValue}
                placeholder="La tua password"
                label="Password"
                required
                variant='default'
                radius="md"
            />

            <Group gap={5} grow mt="xs" mb="md">
                {bars}
            </Group>

            <PasswordRequirement label="Ha almeno 8 caratteri" meets={value.length > 7} />
            {checks}
        </div>
    );
}