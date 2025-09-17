import React, { useState } from "react";
import {
    Textarea,
    Button,
    Grid,
    Text,
    CopyButton,
    Card,
    Group,
    ActionIcon,
} from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";

// Universal diacritic stripping: remove all combining marks
function stripDiacritics(input: string): string {
    return input.normalize("NFD").replace(/\p{M}/gu, "");
}

// Visualize NFD: insert ◌ before combining marks
function visualizeNFD(input: string): string {
    return input.normalize("NFD").replace(/(\p{M})/gu, "◌$1");
}

// A few sample Greek & Hebrew words
const sampleWords = [
    { label: "Greek: ἀγαθός", value: "ἀγαθός" },
    { label: "Greek: Ἀβαδδών", value: "Ἀβαδδών" },
    { label: "Greek: λόγος", value: "λόγος" },
    { label: "Hebrew: אֹבֵד", value: "אֹבֵד" },
    { label: "Hebrew: שָׁלוֹם", value: "שָׁלוֹם" },
    { label: "Hebrew: מָשִׁיחַ", value: "מָשִׁיחַ" },
];

const TextNormalizer: React.FC = () => {
    const [input, setInput] = useState(sampleWords[0].value);

    const composed = input.normalize("NFC");
    const decomposed = input.normalize("NFD");
    const decomposedVisible = visualizeNFD(input);
    const stripped = stripDiacritics(input);
    const strippedLower = stripped.toLowerCase();

    const outputs = [
        { label: "Composed (NFC)", value: composed },
        { label: "Decomposed (NFD)", value: decomposed },
        { label: "Decomposed (NFD, visualized)", value: decomposedVisible },
        { label: "Stripped", value: stripped },
        { label: "Stripped + Lowercase", value: strippedLower },
    ];

    return (
        <Card shadow="sm" p="lg" mt="lg" radius="md" withBorder>
            <Text size="xl" fw={600} mb="md">
                Text Normalizer
            </Text>

            {/* Sample words */}
            <Group mb="lg" >
                {sampleWords.map(({ label, value }) => (
                    <Button
                        key={value}
                        size="xs"
                        variant="light"
                        onClick={() => setInput(value)}
                    >
                        {label}
                    </Button>
                ))}
            </Group>

            {/* Input box */}
            <Textarea
                placeholder="Paste text here…"
                autosize
                minRows={2}
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                mb="lg"
                autoFocus
            />

            {/* Outputs */}
            {outputs.map(({ label, value }) => (
                <Grid key={label} align="center" gutter="sm" mb="md">
                    <Grid.Col span={3}>
                        <Text size="sm" c="dimmed">
                            {label}:
                        </Text>
                    </Grid.Col>
                    <Grid.Col span={8} style={{ display: "flex", alignItems: "center" }}>
                        <Text
                            style={{ fontFamily: "serif", fontSize: "1.8rem", flexGrow: 1 }}
                        >
                            {value || "—"}
                        </Text>
                        <CopyButton value={value}>
                            {({ copied, copy }) => (
                                <ActionIcon
                                    onClick={copy}
                                    color={copied ? "teal" : "blue"}
                                    variant="subtle"
                                    size="lg"
                                    ml="sm"
                                >
                                    {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                                </ActionIcon>
                            )}
                        </CopyButton>
                    </Grid.Col>
                </Grid>
            ))}
        </Card>
    );
};

export default TextNormalizer;
